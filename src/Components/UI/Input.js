import classes from "./Input.module.css"

// {...props.input} this will work like--{type:'text'}
const Input =props=>{
return<div className={classes.input}>
<label htmlFor={props.input.id}>{props.label}</label>
<input {...props.input} />
</div>
}
export default Input