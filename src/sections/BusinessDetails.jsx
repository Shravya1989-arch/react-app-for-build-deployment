import React from "react";
import {
  useFormContext
} from "react-hook-form";

function BusinessDetails() {

  const {
    register,
    formState: { errors }
  } = useFormContext();

  console.log(
    "BusinessDetails Rendered"
  );

  return (
    <div>

      <h3>Business Details</h3>

      <label>
        Business Name
      </label>

      <input
        {...register(
          "businessName",
          {
            required:
              "Business Name is required"
          }
        )}
      />

      <p>
        {
          errors.businessName?.message
        }
      </p>

      <br />

      <label>Email</label>

      <input
        {...register("email", {
          required:
            "Email is required",
          pattern: {
            value:
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message:
              "Invalid Email"
          }
        })}
      />

      <p>
        {errors.email?.message}
      </p>

    </div>
  );
}

export default BusinessDetails;