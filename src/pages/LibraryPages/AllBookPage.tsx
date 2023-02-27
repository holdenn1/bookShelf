import React from 'react';
import AddingBook from "../../components/AddingBook/AddingBook";
import FormAddingBook from "../../components/FormAddingBook/FormAddingBook";

function AllBookPage() {
  return (
    <div>
      <AddingBook title='It`s still empty here'/>
      <FormAddingBook/>
    </div>
  );
}

export default AllBookPage;