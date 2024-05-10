import React, { useState } from "react";

import styles from "./SearchForm.module.css";

interface Props {
  onSubmit: (query: string) => void;
}

const SearchForm = ({ onSubmit }: Props) => {
  const [query, setQuery] = useState("");
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="q"
          onChange={handleQueryChange}
          placeholder="Enter location"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Get Weather
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
