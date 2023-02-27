import React from 'react';
import AddingBook from "../../components/AddingBook/AddingBook";
import FormAddingBook from "../../components/FormAddingBook/FormAddingBook";

function NewBookPage() {
  return (
    <div>
      <AddingBook title='Would you like to add more books to the library?'/>
      <FormAddingBook/>
    </div>
  );
}

export default NewBookPage;