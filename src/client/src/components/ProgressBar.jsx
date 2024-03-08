const ProgressBar = ({ step }) => {

    const steps = [
        {stepNumber : 1, label: "Experience"},
        {stepNumber : 2, label: "Class"},
        {stepNumber : 3, label: "Exposure"},
        {stepNumber : 4, label: "Length/Gain"},
        {stepNumber : 5, label: "Location"},
        {stepNumber : 6, label: "Range"},
        {stepNumber : 7, label: "Traffic"}
    ];

    const ProgressText = ({ stepNumber, label }) => {
        return (
            <div className={`${stepNumber === step && "active-text"}`}>{`${stepNumber}: ${label}`}</div>
        )
    }

    return (
        <div className="form-progress-bar">
            {steps.map((el) => {
                return <ProgressText key={el.stepNumber} stepNumber={el.stepNumber} label={el.label} />
            })}
        </div>
    )
}

export default ProgressBar;