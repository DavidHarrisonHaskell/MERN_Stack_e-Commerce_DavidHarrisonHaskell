import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Pie, Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, elements } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useSelector } from 'react-redux';
import './AdminStatistics.css';


ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale, elements);

const AdminStatistics = () => {
    const navigate = useNavigate();
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Products Sold',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }
        ]
    });

    const [barChartData, setBarChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Products Bought',
                data: [],
                backgroundColor: 'rgba(54,162,235,0.6)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1
            }
        ]
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const allOrders = useSelector(state => state.orders.items);
    const allProducts = useSelector(state => state.products.items);
    let allUsers = useSelector(state => state.users.items);



    const logOut = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const statisticsInformation = () => {
        let productsSold = allProducts.map(product => {
            let productSold = {
                "Product ID": product._id,
                "Product Title": product.Title,
                "Quantity Sold": 0
            }
            // get all the orders of the product
            const productOrders = allOrders.filter(order =>
                order.Orders.some(orderProduct => orderProduct.ProductID == product._id)
            );
            //find all the orders of the product
            let orders = productOrders.map(order => {
                const the_product_bought = order.Orders.find(orderProduct => orderProduct.ProductID == product._id)
                return the_product_bought.Quantity
            })
            productSold["Quantity Sold"] = orders.reduce((a, b) => a + b, 0);
            return productSold;
        })
        const productTitles = productsSold.map(product => product["Product Title"]);
        const quantitySold = productsSold.map(product => product["Quantity Sold"]);


        // prepare the data for the chart
        setChartData({
            labels: productTitles,
            datasets: [
                {
                    label: 'Products Sold',
                    data: quantitySold,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    // dataLabels: {
                    //     anchor: 'end',
                    //     align: 'end',
                    //     formatter: (value, context) => {
                    //         return value
                    //     },
                    //     color: '#000',
                    //     font: {
                    //         weight: 'bold'
                    //     }
                    // }
                }
            ]
        });
    }

    const statisticsInformationUsersOrders = () => {
        // data for a bar chart of all the users orders based on the user's ID

        allUsers = allUsers.filter(user => user.admin === false); // only get the users not the admin
        let usersOrders = allUsers.map(user => { // for each user
            let userOrders = { // create an object with some of the user's information
                "User ID": user._id,
                "First Name": user["First Name"],
                "Last Name": user["Last Name"],
                "Orders": []
            }
            // get all the orders of the user
            const userOrdersList = allOrders.filter(order => order.UserID == user._id);
            //find all the products bought by the user including the total quantity of each product bought 
            // by the user for all orders of the user
            // and the product title and the product ID
            let orders = userOrdersList.flatMap(order =>
                order.Orders.map(product => ({
                    "ProductID": product.ProductID,
                    "Product Title": product["Product Title"],
                    "Quantity": product.Quantity
                }))
            )
            // get the total quantity of each type of product and only list each product once
            let aggregatedOrders = orders.reduce((acc, order) => { // aggregate the orders
                let existingOrder = acc.find(o => o["ProductID"] == order["ProductID"]); // check if the order already exists
                if (existingOrder) { // if the order already exists
                    existingOrder["Quantity"] += order["Quantity"]; // add the quantity of the order to the existing order
                } else { // if the order does not exist
                    acc.push(order); // add the order to the list of orders
                }
                return acc;
            }, []);
            userOrders["Orders"] = Object.values(aggregatedOrders);
            return userOrders;
        })
        return usersOrders;
    }


    console.log("statisticsInformationUsersOrders", statisticsInformationUsersOrders());

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
        const userOrders = statisticsInformationUsersOrders().find(user => user["User ID"] == e.target.value);
        if (userOrders) {
            const productTitles = userOrders["Orders"].map(product => product["Product Title"]);
            const quantityBought = userOrders["Orders"].map(product => product["Quantity"]);

            const colors = productTitles.map((__, index) => `hsl(${index * 30}, 70%, 50%)`);


            setBarChartData({
                labels: productTitles,
                datasets: [
                    {
                        label: null,
                        data: quantityBought,
                        backgroundColor: colors,
                        borderColor: colors.map(color => color.replace('0.6', '1')),
                        borderWidth: 1
                    }
                ]
            });
        }
        console.log("userOrders", userOrders);
    }








    useEffect(() => {
        if (allOrders.length > 0 && allProducts.length > 0) {
            statisticsInformation();
            statisticsInformationUsersOrders();
        }
    }, [allOrders, allProducts]);


    return (
        <>
            <Navbar /><br />
            <div className="adminStatisticsComponent">
                <h1 className="headerStatisticsAdmin"><b>Statistics</b></h1>
                {chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 && (
                    <>
                        <div className="pieChartStatistics">
                            <h2 className="productsSoldHeader">Products Sold</h2>
                            <Pie
                                data={chartData}
                                options={{
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'top',
                                        },
                                        datalabels: {
                                            anchor: 'center',
                                            align: 'center',
                                            formatter: (value, context) => {
                                                return context.chart.data.labels[context.dataIndex] + ': ' + value
                                            },
                                            color: '#000000', // Changed to black hard color
                                            font: {
                                                weight: 'bold',
                                                size: 16
                                            }
                                        },
                                    },
                                    elements: {
                                        arc: {
                                            borderWidth: 1,
                                            borderColor: '#000000', // Changed to black hard color
                                            shadowOffsetX: 3,
                                            shadowOffsetY: 3,
                                            shadowBlur: 10,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }}
                            />
                        </div>

                    </>
                )}
                <br /><br />
                <h2 className="productsBoughtHeader">Products Quantity Per Customer</h2>
                <label htmlFor="users"><b>Sort by Customer</b></label><br />
                <select id="users" name="users" onChange={handleUserChange}>
                    <option value="">Select a user:</option>
                    {allUsers.map(user => (
                        <option key={user._id} value={user._id}>{user["First Name"]} {user["Last Name"]}</option>
                    ))}
                </select>
                <div className="barChartStatistics">
                    {barChartData.labels.length > 0 && barChartData.datasets[0].data.length > 0 ? (
                        <Bar
                            data={barChartData}
                            options={{
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: 'top',
                                    },
                                    datalabels: {
                                        anchor: 'center',
                                        align: 'center',
                                        formatter: (value, context) => {
                                            return value
                                        },
                                        color: '#000000', // Changed to black hard color
                                        font: {
                                            weight: 'bold',
                                            size: 16
                                        }
                                    },
                                },
                                elements: {
                                    bar: {
                                        borderWidth: 1,
                                        borderColor: '#000000', // Changed to black hard color
                                        shadowOffsetX: 3,
                                        shadowOffsetY: 3,
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }}
                        />
                    ) : (
                        <div className="NoProductsBought">
                            <h3>No products Bought</h3>
                        </div>
                    )}
                </div>
                <button onClick={logOut}>Log Out</button>
            </div>
        </>
    );
}

export default AdminStatistics;