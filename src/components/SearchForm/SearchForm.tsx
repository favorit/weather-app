import React from "react";

interface Props {
  onSubmit: (query: string) => void;
}

const SearchForm = ({ onSubmit }: Props) => {
  const [query, setQuery] = React.useState("");
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="q"
        onChange={handleQueryChange}
        placeholder="Enter location"
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default SearchForm;
