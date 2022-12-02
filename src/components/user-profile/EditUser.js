export const EditUser = () => {
    return (
        <form className='auth'>
            <h3>Edit User</h3>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" id="username" name="username" />
            <button type="submit">Edit</button>
        </form>
    );
}