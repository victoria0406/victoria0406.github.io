import React,{useState} from 'react';
import Pagination from './Pagination';
import {Link} from 'react-router-dom';
import {paginate} from './paginate';
import '../style/table.css';


const MoviesPage = (props) =>{

    //console.log(props.location.state.group);
    //console.log(props.location.state.user);
    var size = 1450;
    var zoom = window.innerWidth / size 
    document.body.style.zoom = zoom;
    

    const getMovies = () => {
        const movies = [
        {date: "2000-10-12", groupname: "BADMINTON LOVERS", betting: "10000", state: <><button className = "win">WIN!</button>&nbsp;&nbsp;<button className = "lose">LOSE</button>&nbsp;&nbsp;<button className = "tie">TIE</button></> },
        {date: "2000-10-12", groupname: "BADMINTON LOVERS", betting: "1000", state:"    Challenge Sent!"},
        {date: "2000-10-12", groupname: "BADMINTON LOVERS", betting: "100", state: "win"},
        {date: "2000-10-12", groupname: "BADMINTON LOVERS", betting: "10", state: "win"},
        {date: "2000-10-12", groupname: "BADMINTON LOVERS", betting: "20000", state: "lose"},
        {date: "2000-10-12", groupname: "BADMINTON LOVERS", betting: "40", state: "win"},
        {date: "2000-10-12", groupname: "BADMINTON LOVERS", betting: "30000", state: "lose"}
        ]
        return movies;
    }

    const [movies, setMovies] = useState({
        data: getMovies(),
        pageSize: 5,
        currentPage: 1
    });

    const handlePageChange = (page) => {
        setMovies({...movies, currentPage: page});
    }

    const{ data, pageSize, currentPage } = movies;
    const pageMovies = paginate(data, currentPage, pageSize);
    
    const {length: count } = movies.data;
    if(count === 0)
        return <p>도전장 정보가 없습니다.</p>

    return (
        <>
    
            <div className = "table_shape"></div>
            <div className = "table_line"></div>
            <table className="table">
                <thread>
                    <tr>
                        <th width = "230">DATE</th>
                        <th width = "300">Group Name</th>
                        <th width = "220">Betting Mileage</th>
                        <th width = "300">State</th>
                    </tr>
                
                <tbody>
                    {pageMovies.map(movie =>
                        <tr key={movie.id} width = "600">
                            <td width = "230" text-align = 'center'>{movie.date}</td>
                            <td width = "300" text-align = 'center'>{movie.groupname}</td>
                            <td width = "220" text-align = 'center'>{movie.betting}</td>
                            <td width = "300" text-align = 'center'> 
                                
                                {movie.state}
                            </td>
                        </tr>
                    )}
                </tbody>
                </thread>
            </table>
            
            <Pagination
                pageSize = {pageSize}
                itemsCount = {count}
                currentPage = {currentPage}
                onPageChange = {handlePageChange}                
            />
  
        </>
    );
};

export default MoviesPage;