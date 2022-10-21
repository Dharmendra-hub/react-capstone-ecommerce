import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            {/* Moved up for css shrink effect on selecting the input */}
            <input className="form-input" {...otherProps} />
            {label && (
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>
            )}
        </div>
    )
}

export default FormInput;
