import {
  useFormContext,
  useWatch
} from "react-hook-form";

function AddressDetails() {

  const {
    register,
    control
  } = useFormContext();

  const country = useWatch({
    control,
    name: "country"
  });

  console.log(
    "AddressDetails Rendered"
  );

  return (
    <div>

      <h3>Address Details</h3>

      <label>
        Country
      </label>

      <select
        {...register("country")}
      >
        <option value="">
          Select
        </option>

        <option value="India">
          India
        </option>

        <option value="USA">
          USA
        </option>
      </select>

      <br />
      <br />

      <label>City</label>

      <input
        {...register("city")}
      />

      <br />
      <br />

      {country === "India" && (
        <>
          <label>
            PAN Number
          </label>

          <input
            {...register("pan")}
          />
        </>
      )}

    </div>
  );
}

export default AddressDetails;