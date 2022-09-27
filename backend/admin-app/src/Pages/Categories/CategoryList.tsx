import React, { useEffect, useMemo, useRef, useState } from "react";
import ApiService from "../../services/ApiService";
import { ISectionBase, ISectionCategory } from "../../Shared/interfaces";
import { useNavigate  } from "react-router-dom";
import { useTable } from "react-table";

const CategoryList  = (props) => {
const [caterogies, setCategories] = useState<ISectionCategory[]>([]);
const [searchTitle, setSearchTitle] = useState("");
const categoriesRef = useRef<ISectionCategory[]>([]);

const navigate = useNavigate();
categoriesRef.current = caterogies;

 
useEffect(() => {
    retrieveCategories();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveCategories = () => {
    ApiService.getAll()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCategories();
  };

  const removeAllCategories = () => {
    ApiService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ApiService.findByTitle(searchTitle)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openCategory = (rowIndex) => {
    const id = categoriesRef.current[rowIndex].id;
    navigate("/categories/" + id);
   // props.history.push();
  };

  const deleteCategory = (rowIndex) => {
    const id = categoriesRef.current[rowIndex].id;

    ApiService.remove(id)
      .then((response) => {
        navigate("/categories/");

  //      props.history.push("/Categories");

        let newCategories = [...categoriesRef.current];
        newCategories.splice(rowIndex, 1);

        setCategories(newCategories);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openCategory(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteCategory(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: caterogies,
  });

  return (

    <div className="list row">
          <div className="top-title">
            <h1>Cloud Categories</h1>
    </div>
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllCategories}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default CategoryList;