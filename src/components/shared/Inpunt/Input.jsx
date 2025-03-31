import './input.css';

const Inpunt = (props) => {
    const { label, id, register, type, placeholder = '', errors, ...rest } = props;

    return (
        <div className="form-group d-flex flex-column gap-2">
            <label htmlFor={id}>{label}</label>
            <input type={type} className={`form-control ${errors ? 'is-invalid' : ''}`} id={id} placeholder={placeholder} {...register} {...rest}/>
            {errors && (
                <p className='invalid-feedback m-0' role="alert">{errors?.message}</p>
            )}
        </div>
    );
};

export default Inpunt;