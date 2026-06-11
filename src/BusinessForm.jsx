import React from "react";
import {
  useForm,
  FormProvider
} from "react-hook-form";

import BusinessDetails from "./sections/BusinessDetails";
import AddressDetails from "./sections/AddressDetails";
import OwnerDetails from "./sections/OwnerDetails";

function BusinessForm() {

  const methods = useForm({
    defaultValues: {
      businessName: "",
      email: "",
      country: "",
      city: "",
      ownerName: ""
    }
  });

  const {
    handleSubmit,
    reset
  } = methods;

  const onSubmit = (data) => {
    console.log("Form Data", data);

    alert(
      JSON.stringify(data, null, 2)
    );

    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <h2>Business Account Opening</h2>

        <BusinessDetails />

        <AddressDetails />

        <OwnerDetails />

        <button type="submit">
          Submit
        </button>

      </form>
    </FormProvider>
  );
}

export default BusinessForm;