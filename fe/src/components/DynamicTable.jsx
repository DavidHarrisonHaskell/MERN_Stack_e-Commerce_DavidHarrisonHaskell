import './DynamicTable.css';

// a dynamic table component that can render a table with any number of columns and rows
// the columns prop is an array of objects, each object has a key and a label
// the data prop is an array of objects, each object has a key that corresponds to the key of the columns object

// the function will check if there is a subTable to be rendered
// the subColumns prop is an array of objects, each object has a key and a label

const DynamicTable = (props) => {
    const { columns, data, subColumns } = props;

    return (
        <table bordered hover className='DynamicTable'>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td key={column.key}>
                                <div className={Array.isArray(row[column.key]) && row[column.key].length === 0 ? 'fit-text': 'scrollable-content'}>
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
                                                    {row[column.key].map((subRow, index) => (
                                                        <tr key={index}>
                                                            {subColumns.map((subColumn) => (
                                                                <td key={subColumn.key}>{subRow[subColumn.key]}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : ("No orders were made")
                                    ) : (
                                        row[column.key]
                                    )}
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DynamicTable;