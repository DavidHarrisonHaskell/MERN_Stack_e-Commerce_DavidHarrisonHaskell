
import './DynamicTable.css';
import { useState } from 'react';
// a dynamic table component that can render a table with any number of columns and rows
// the columns prop is an array of objects, each object has a key and a label
// the data prop is an array of objects, each object has a key that corresponds to the key of the columns object

// the function will check if there is a subTable to be rendered
// the subColumns prop is an array of objects, each object has a key and a label

const DynamicTable = (props) => {
    const { columns, data, subColumns, source, users } = props;
    const filteredUsers = users ? users.filter(user => !user.admin) : null;
    const [editableRows, setEditableRows] = useState({});

    const handleInputChange = (rowIndex, columnKey, value) => {
        const newEditableRows = { ...editableRows };
        if (!newEditableRows[rowIndex]) {
            newEditableRows[rowIndex] = {};
        }
        // console.log("e.target.value", value)
        newEditableRows[rowIndex][columnKey] = value
        setEditableRows(newEditableRows);
    };

    const handleSave = (row, rowIndex) => {
        const updatedRow = editableRows[rowIndex];
        if (updatedRow) {
            props.onSave(row, rowIndex, updatedRow);
            //clear the editable row state after saving
            const newEditableRows = { ...editableRows, [rowIndex]: undefined };
            setEditableRows(newEditableRows);
        }
    };

    const tableClassName = source === 'AdminProducts' ? 'DynamicTableProducts' : 'DynamicTable';
    return (
        <table className={tableClassName}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.label}</th>
                    ))}
                    {source === 'AdminProducts' && <th>Save</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column) => (
                            <td key={column.key}>
                                <div className={Array.isArray(row[column.key]) && row[column.key].length === 0 ? 'fit-text' : 'scrollable-content'}>
                                    {Array.isArray(row[column.key]) ? (
                                        row[column.key].length > 0 ? (
                                            <table className='subTable'>
                                                <thead>
                                                    <tr>
                                                        {subColumns.map((subColumn) => (
                                                            <th key={subColumn.key}>{subColumn.label}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {row[column.key].map((subRow, rowIndex) => (
                                                        <tr key={rowIndex}>
                                                            {subColumns.map((subColumn) => (
                                                                <td key={subColumn.key}>{subRow[subColumn.key]}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : ("No orders were made")
                                    ) : ( source === 'AdminProducts' && 
                                        editableRows[rowIndex] && editableRows[rowIndex][column.key] !== undefined ? (
                                            column.key === 'Quantity' ? (
                                                <input
                                                    type='number'
                                                    min="1"
                                                    value={editableRows[rowIndex][column.key]}
                                                    onChange={(e) => handleInputChange(rowIndex, column.key, e.target.value)}
                                                />
                                            ) : column.key === 'Order Date' ? (
                                                <input
                                                    type='date'
                                                    value={editableRows[rowIndex][column.key]}
                                                    onChange={(e) => handleInputChange(rowIndex, column.key, e.target.value)}
                                                />
                                            ) : (
                                                <select
                                                    value={editableRows[rowIndex][column.key] || ''}
                                                    onChange={(e) => handleInputChange(rowIndex, column.key, e.target.value)}
                                                >
                                                    <option value="" disabled>
                                                        Select a user
                                                    </option>
                                                    {filteredUsers.map(user => (
                                                        <option key={user._id} value={user._id}>
                                                            {`${user["First Name"]} ${user["Last Name"]}`}
                                                        </option>
                                                    ))}
                                                </select>
                                            )
                                        ) : (
                                            <div onClick={() => setEditableRows({
                                                ...editableRows,
                                                [rowIndex]: {
                                                    ...editableRows[rowIndex],
                                                    [column.key]: column.key === "User Full Name" ? row["User ID"] : row[column.key]
                                                }
                                            })}>
                                                {row[column.key]}
                                            </div>
                                        )
                                    )}
                                </div>
                            </td>
                        ))}
                        {source === 'AdminProducts' && (
                            <td>
                                <button onClick={() => handleSave(row, rowIndex)}>Save</button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DynamicTable;