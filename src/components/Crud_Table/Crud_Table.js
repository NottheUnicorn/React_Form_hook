import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";


import "./index.css";



let tasks = [
  {
    id: 1,
    make: "Honda",
    model: "Accord",
    year: "2005",
    price: "1,500,000",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: "2015",
    price: "15,000",
  },
];

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = tasks.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (task) => {
    count += 1;
    tasks.push({
      ...task,
      id: count,
    });
    return Promise.resolve(task);
  },
  update: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    task.make = data.make;
    task.model = data.model;
    task.year = data.year;
    task.price = data.price;
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    tasks = tasks.filter((t) => t.id !== task.id);
    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

const Crud = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Car Inventory"
      fetchItems={(payload) => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="make" label="Make" placeholder="Make" />
        <Field name="model" label="Model" placeholder="Model" />
        <Field name="year" label="Year" placeholder="Year" />
        <Field name="price" label="Price" placeholder="Price" />
        
      </Fields>
      <CreateForm
        title="Task Creation"
        message="Create a new task!"
        trigger="Create Task"
        onSubmit={(task) => service.create(task)}
        submitText="Create"
       
      />

      <UpdateForm
        title="Task Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={(task) => service.update(task)}
        submitText="Update"
        
      />

      <DeleteForm
        title="Delete Car"
        message="Are you sure you want to delete the Car?"
        trigger="Delete"
        onSubmit={(task) => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);



export default Crud;
