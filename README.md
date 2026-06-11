How useForm Works Internally
----------------------------
1. When React render

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm();

React Hook Form creates an internal store.

{
  businessName: "",
  email: "",
  phone: "",
  country: ""
}


it does not re-render the whole component on every key press.

2. register()

This is the most important function.

register("businessName")

Connect RHF to the input

<input
  {...register("businessName")}
/>

3. register with Validation
---------------------------
register("email", {
  required: "Email required"
})

Means:

If email empty
show error

register("phone", {
  required: true,
  minLength: 10
})

1. Empty?
2. Less than 10 chars?


errors Object
-------------
if validation failes

erros

becomes

{
  phone: {
    message: "Minimum 10 digits"
  }
}

{
  errors.phone && <p>{errors.phone.message}</p>
}

handleSubmit()
<form onSubmit={handleSubmit(onSubmit)}>

Without RHF:

e.preventDefault();
validate();
submit();

Watching Field Changes
-----------------------
const country = watch("country");

example:

const country = watch("country");

{
  country === "India" &&
  <input placeholder="PAN Number" />
}

if India selected:

Show PAN Number field

Reset Form
----------
const {
  reset
} = useForm();

after submite;

reset()

clear fields


FormProvider
------------
Share form methods with nested components.

to pass method props to childern components

<FormProvider {...methods}>
  <BusinessDetails />
</FormProvider>

Child components accessed form methods directly.

const { register } = useFormContext();


DEMO
-----
With RHF
register("businessName")

Typing:

A
AB
ABC

RHF stores values internally using refs.

No parent state update
↓
No full form rerender
↓
Only affected subscriptions update

Performance improves significantly.

User enter

Business Name : ABC Pvt Ltd
Email         : abc@gmail.com
Country       : India
City          : Bangalore
PAN           : ABCDE1234F
Owner Name    : John

Subit output

{
  businessName: "ABC Pvt Ltd",
  email: "abc@gmail.com",
  country: "India",
  city: "Bangalore",
  pan: "ABCDE1234F",
  ownerName: "John"
}