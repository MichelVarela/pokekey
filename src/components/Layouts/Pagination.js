import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({children}) => {

    const el = [
    { number: "Number 1"},
    { number: "Number 2"},
    { number: "Number 3"},
    { number: "Number 4"},
    { number: "Number 5"},
    { number: "Number 6"},
    { number: "Number 7"},
    { number: "Number 8"},
    { number: "Number 9"},
    { number: "Number 10"},
    { number: "Number 11"},
    { number: "Number 12"},
    { number: "Number 13"},
    { number: "Number 14"},
    { number: "Number 15"},
    { number: "Number 16"},
    { number: "Number 17"},
    { number: "Number 18"},
    { number: "Number 19"},
    { number: "Number 20"},
    { number: "Number 21"},
    { number: "Number 22"},
    { number: "Number 23"},
    { number: "Number 24"},
    { number: "Number 25"},
    { number: "Number 26"},
    { number: "Number 27"},
    { number: "Number 28"},
    { number: "Number 29"},
    { number: "Number 30"},
    { number: "Number 31"},
    { number: "Number 32"},
    { number: "Number 33"},
    { number: "Number 34"},
    { number: "Number 35"},
    { number: "Number 36"},
    { number: "Number 37"},
    { number: "Number 38"},
    { number: "Number 39"},
    { number: "Number 40"},
    { number: "Number 41"},
    { number: "Number 42"},
    { number: "Number 43"},
    { number: "Number 44"},
    { number: "Number 45"},
    { number: "Number 46"},
    { number: "Number 47"},
    { number: "Number 48"},
    { number: "Number 49"},
    { number: "Number 50"},
    { number: "Number 51"},
    { number: "Number 52"},
    { number: "Number 53"},
    { number: "Number 54"},
    { number: "Number 55"},
    { number: "Number 56"},
    { number: "Number 57"},
    { number: "Number 58"},
    { number: "Number 59"},
    { number: "Number 60"},
    { number: "Number 61"},
    { number: "Number 62"},
    { number: "Number 63"},
    { number: "Number 64"},
    { number: "Number 65"},
    { number: "Number 66"},
    { number: "Number 67"},
    { number: "Number 68"},
    { number: "Number 69"},
    { number: "Number 70"},
    { number: "Number 71"},
    { number: "Number 72"},
    { number: "Number 73"},
    { number: "Number 74"},
    { number: "Number 75"},
    { number: "Number 77"},
    { number: "Number 78"},
    { number: "Number 79"},
    { number: "Number 80"},
    { number: "Number 81"},
    { number: "Number 82"},
    { number: "Number 83"},
    { number: "Number 84"},
    { number: "Number 85"},
    { number: "Number 86"},
    { number: "Number 87"},
    { number: "Number 88"},
    { number: "Number 89"},
    { number: "Number 90"},
    { number: "Number 91"},
]

let current_page = 1;
const obj_per_page = 20; 

const totNumPages = () => {
    return Math.ceil(el.length / obj_per_page);
}

//console.log(totNumPages());

const prevPage = () => { // si la page actual es > 1 (primer page) que disminuya en 1
    if (current_page > 1) {
        current_page--;
        change(current_page);
    }
}

const nextPage = () => {
    if (current_page < totNumPages()) {
        current_page++;
        change(current_page);
    }
}

const change = page => {
    const btn_next = document.getElementById("btn_next");
    const btn_prev = document.getElementById("btn_prev");
    const listing_table = document.getElementById("TableList");
    const page_span = document.getElementById("page");

    if (page < 1) page = 1;
    if (page > totNumPages()) page = totNumPages();

    listing_table.innerHTML = "";
    for (let i = (page-1) * obj_per_page; i < (page * obj_per_page); i++) {
        listing_table.innerHTML += el[i].number + "<br>";
    }
    page_span.innerHTML = page;
    if (page === 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }
    if (page === totNumPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

window.onload = function() {
    change(1);
};

  return (
    <>
        <div id="TableList">{children}</div>
            <button onClick={prevPage} id="btn_prev">Prev</button>
            <button onClick={nextPage} id="btn_next">Next</button>
        page: <span id="page"></span>
    </>
  )
}

export default Pagination;