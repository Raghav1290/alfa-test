import React, { useEffect, useMemo, useState } from 'react'
import './Leaderboard.css';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';


function Leaderboard() {

    const [studentData, setStudentData] = useState([])
    

    useEffect(() => {
        fetch('/get_data').then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data => setStudentData(data))
    }, [])
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => studentData, [studentData]);
    console.log("test")
    console.log(studentData)

    const tableInstance = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy)

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance
    const { globalFilter } = state;

    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="leaderboard">
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                            <span>
                                                {
                                                    column.isSorted ? (column.isSortedDesc ? '  v' : '  ^' ) : ''
                                                }
                                            </span>
                                        </th>
                                    ) )
                                }
                            </tr>
                        ) )
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
        </div>
        </>
    )
}

export default Leaderboard;
