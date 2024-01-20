import UserForm from "../components/UserForm";

function SummitSelector ({ user }) {
    return (
    <div className="form-overlay-container">
        <div className="form-overlay-box">
            <UserForm user={user} />
        </div>
    </div>
    )
}

export default SummitSelector;