import { useState } from "react";
// import Note from "./components/Note";
import "./App.css";

const App = () => {
  const [companies, setCompanies] = useState([]); // Storing the list of companies

  const [newCompany, setNewCompany] = useState({
    name: "",
    role: "",
  }); // Storing the input

  const [filterText, setFilterText] = useState(""); // Hold the filter text

  const addCompany = (event) => {
    event.preventDefault(); // this prevents the default action of submitting a form
    console.log("button clicked", event.target);
    console.log("Company Name:", newCompany.name);
    console.log("Role:", newCompany.role);

    if (
      companies.some(
        (company) =>
          company.content.toLowerCase() === newCompany.name.toLowerCase()
      )
    ) {
      alert(`${newCompany} is already added to hitlist`);
    } else if (newCompany.name && newCompany.role) {
      // creates a new object for the note called noteObject that will receive its content from the component's newNote state
      const noteObject = {
        content: newCompany.name,
        role: newCompany.role,
        important: Math.random() < 0.5,
        id: String(companies.length + 1), // The unique identifier id is generated based on the total number of notes. This method works for our application since notes are never deleted
      };

      setCompanies(companies.concat(noteObject)); // new note is added to the list of notes using the concat array method. The method does not mutate the original notes array, but rather creates a new copy of the array with the new item added to the end. This is important since we must never mutate state directly in React!
      setNewCompany({
        name: "",
        role: "",
      }); // resets the value of the controlled input element by calling the setNewNote function of the newNote state
    } else {
      alert("Please fill in both the company name and role.");
    }

    console.log(companies);
  };

  // const handleNoteChange = (event) => {
  //   console.log(event.target.value);
  //   setNewCompany(event.target.value);

  //   // const { newCompany, value } = event.target;
  //   // setNewCompany((companies) => ({
  //   //   ...companies,
  //   //   [newCompany]: value,
  //   // }));

  //   // setNewCompany((prevState) => ({
  //   //   ...prevState,
  //   //   [newCompany]: value,
  //   // }));
  // };

  // Handle changes for the name input field
  const handleNameChange = (event) => {
    console.log(event.target.value);
    const { value } = event.target;
    setNewCompany((prevCompany) => ({
      ...prevCompany,
      name: value, // Update only the name property
    }));
  };

  // Handle changes for the role input field
  const handleRoleChange = (event) => {
    console.log(event.target.value);
    const { value } = event.target;
    setNewCompany((prevCompany) => ({
      ...prevCompany,
      role: value, // Update only the role property
    }));
  };

  // Handles changees for the filter field
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterText(event.target.value);
    // const { value } = event.target;

    // setCompanies(companies.filter((company) => company.content == value));
  };

  // Filter items based on the filterText
  const filteredCompanies = companies.filter(
    (company) =>
      company.content.toLowerCase().includes(filterText.toLowerCase()) // Case-insensitive filtering
  );

  return (
    <div id="screen">
      <div id="section-1">
        <h1>Company Hitlist</h1>
        <h2>Add a new company</h2>
        <form onSubmit={addCompany}>
          <div>
            Company: 
            <input
              value={newCompany.name}
              onChange={handleNameChange}
              type="text"
            />
          </div>
          <div>
            Role:{" "}
            <input
              value={newCompany.role}
              onChange={handleRoleChange}
              type="text"
            />
          </div>
          <div>
            <button type="submit" onClick={addCompany}>
              Add Company
            </button>
          </div>
        </form>
      </div>
      <div id="section-2">
        <h2>Filtered Companies</h2>
        <div>
          Filter by company name:
          <input
            value={filterText}
            placeholder="i.e. Apple"
            onChange={handleFilterChange}
            type="text"
          />
        </div>
        {filterText && (
          <ul>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <li key={company.id}>
                  {company.content} - {company.role}
                </li>
              ))
            ) : (
              <li>No companies found</li>
            )}
          </ul>
        )}
        <h2>Complete Hitlist</h2>
        <ul>
          {/* {companies.map((company, index) => (
            <Note key={index} note={company} />
          ))} */}
          {companies.map((company, index) => (
            <li key={index}>
              {company.content} {company.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
