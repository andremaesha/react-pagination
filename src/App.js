import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

const BASE_URL = "https://remotive.io/api/remote-jobs";

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: "inline",
        marginLeft: theme.spacing(2),
    },
    activeLinkClassName: {
        backgroundColor: "red",
    },
}));

function App() {
    const classes = useStyles();
    const todosPerPage = 5;
    const [activePage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => setData(data.jobs));
    }, []);

    // Logic for displaying current todos
    const indexOfLastTodo = activePage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);

    // display data
    const renderTodos = currentTodos.map((todo, index) => (
        <li key={index}>{todo.title}</li>
    ));

    // handle page when it changed
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1>total jobs: {data.length}</h1>
            <div>{renderTodos}</div>
            <div>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={todosPerPage}
                    totalItemsCount={data.length}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}
                    activeLinkClass={classes.activeLinkClassName}
                    itemClass={classes.pagination}
                />
            </div>
        </div>
    );
}

export default App;
