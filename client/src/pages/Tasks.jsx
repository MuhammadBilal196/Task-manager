import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskSearch from "../components/TaskSearch";
import TaskFilter from "../components/TaskFilter";
import TaskList from "../components/TaskList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import useDebounce from "../hooks/useDebounce";

const Tasks = () => {
  const { tasks, loading, error, fetchTasks, changeStatus, removeTask } = useTasks();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "All", priority: "All", category: "All" });
  const [sort, setSort] = useState("newest");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    fetchTasks({ search: debouncedSearch, ...filters, sort });
  }, [debouncedSearch, filters, sort, fetchTasks]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>All Tasks</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          + Add Task
        </Link>
      </div>

      <div className="toolbar">
        <TaskSearch value={search} onChange={setSearch} />
        <TaskFilter filters={filters} onChange={setFilters} sort={sort} onSortChange={setSort} />
      </div>

      <ErrorMessage message={error} onRetry={() => fetchTasks({ search, ...filters, sort })} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <TaskList tasks={tasks} onStatusChange={changeStatus} onDelete={removeTask} />
      )}
    </div>
  );
};

export default Tasks;
