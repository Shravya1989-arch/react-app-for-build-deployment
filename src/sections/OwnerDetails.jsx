import React from "react";

import {
  useFormContext
} from "react-hook-form";

function OwnerDetails() {

  const {
    register,
    formState: {errors}
  } = useFormContext();

  console.log(
    "OwnerDetails Rendered"
  );

  return (
    <div>

      <h3>
        Owner Details
      </h3>

      <label>
        Owner Name
      </label>

      <input
        {...register(
          "ownerName", {
            required:
                "owner name is required"
          }
        )}
      />

      <p>
        {
          errors.ownerName?.message
        }
      </p>

    </div>
  );
}

export default OwnerDetails;