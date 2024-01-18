import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useLocation } from "react-router-dom";
 import { LinkContainer } from 'react-router-bootstrap';
 
 const useQuery = () => {
    return new URLSearchParams(useLocation().search);
   }
    
   function Paginate({page, pages, maxPageDisplay=5, isAdmin=false}) {
    
       let keyword = useQuery().get("keyword")
    
       let url = !isAdmin ? '/' : '/admin/productlist/'
       url += keyword ? `?keyword=${keyword}&` : '?'

    
       return (pages > 1 && (
           <Pagination>
    
               {/* First */}
               {pages !== 1  ? (
                   <Pagination.First href={`${url}page=1`}>First</Pagination.First>
               ) : (
                   <Pagination.First disabled>First</Pagination.First>
               )}
    
    
               {/* Prev */}
               {page > 1 ? (
                   <Pagination.Prev href={`${url}page=${page-1}`}>&laquo;</Pagination.Prev>
               ) : (
                   <Pagination.Prev disabled>&laquo;</Pagination.Prev>
               )}
               
               
               {/* Pages
                  <React.Fragment>: https://www.designcise.com/web/tutorial/how-to-add-a-key-to-an-empty-tag-in-react
               */}
               {[...Array(pages).keys()].map((x) => (parseInt(page, 10) === x+1 ? (
                           <Pagination.Item key={x+1} active href={`${url}page=${x+1}`}>{x+1}</Pagination.Item>
                       ) : x+1 > page && x+1 <= page + maxPageDisplay ? (
                           <React.Fragment key={x+1}>
                               <Pagination.Item href={`${url}page=${x+1}`}>{x+1}</Pagination.Item>  
                               {x+1 === page + maxPageDisplay && x+1 < pages && (
                                   <Pagination.Ellipsis href={`${url}page=${page+(maxPageDisplay+1)}`} />
                               )}            
                           </React.Fragment>              
                       ) : x+1 < page && x+1 >= page - maxPageDisplay && (
                           <React.Fragment key={x+1} >
                               {x+1 === page - maxPageDisplay && x+1 > 1 && (
                                   <Pagination.Ellipsis href={`${url}page=${page-(maxPageDisplay+1)}`} />
                               )}
                               <Pagination.Item href={`${url}page=${x+1}`}>{x+1}</Pagination.Item>
                           </React.Fragment>    
                       )
                   ))
               }
    
    
               {/* Next */}
               {page < pages ? (
                   <Pagination.Next href={`${url}page=${parseInt(page, 10) + 1}`}>&raquo;</Pagination.Next>
               ) : (
                   <Pagination.Next disabled>&raquo;</Pagination.Next>
               )}
    

               {/* Last */}
               {pages != page ? (
                   <Pagination.Last href={`${url}page=${parseInt(page, 10) + 1}`}>Last</Pagination.Last>
               ) : (
                   <Pagination.Last disabled>Last</Pagination.Last>
               )}
    
           </Pagination>
       ))
   }
    
   export default Paginate