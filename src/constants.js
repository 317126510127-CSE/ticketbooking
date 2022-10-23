
import React from "react";


export const  moviesList=[
    {
         id:1,
         language:"English",
         movieName:"Avengers: Endgame",
         theatreName:"INOX",
         rowCount:6,
         columnCount:20,
         blockedSeats:[],
         bookedSeats:[]
    },
    {
        id:2,
        language:"Hindi",
        movieName:"Uri: The Surgical Strike",
        theatreName:"PVR",
        rowCount:6,
        columnCount:20,
        blockedSeats:[],
         bookedSeats:[]
    },
    {
        id:3,
        language:"Kannada",
        movieName:"KGF: Chapter 1",
        theatreName:"Cinepolis",
        rowCount:6,
        columnCount:20,
        blockedSeats:[],
         bookedSeats:[]

    },
    {
        id:4,
        language:"Tamil",
        movieName:"Master",
        theatreName:"PVR",
        rowCount:6,
        columnCount:20,
        blockedSeats:[],
         bookedSeats:[]
    },
    {
        id:5,
        language:"Telugu",
        movieName:"Bahubali: The beginning",
        theatreName:"INOX",
        rowCount:6,
        columnCount:20,
        blockedSeats:[],
         bookedSeats:[]
    }
]


export const MyContext = React.createContext(moviesList);
export const theatreRowNames=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];