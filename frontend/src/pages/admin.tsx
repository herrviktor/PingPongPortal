import { useEffect, useState } from "react"
import type { IUser } from "../interfaces/interfaces"
import { createUser, deleteUser, getAllUsers, updateUser } from "../services/adminService";

const Admin: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [newUser, setNewUser] = useState<IUser>({ 
        username: "", 
        email: "", 
        password: "" 
    });
    const [editUser, setEditUser] = useState<IUser | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data.users);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
            else {
                setError("Ett okänt fel inträffade");
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editUser) return;
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            await createUser(newUser);
            setNewUser({ username: "", email: "", password: "" });
            fetchUsers();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("Ett okänt fel inträffade");
            }
        }
    };

    const handleEdit = (user: IUser) => {
        setEditUser(user);
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editUser || !editUser.id) return;
        setError(null);
        try {
            await updateUser(editUser.id, editUser);
            setEditUser(null);
            fetchUsers();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("Ett okänt fel inträffade");
            }
        }
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        setError(null);
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("Ett okänt fel inträffade");
            }
        }
    };

    
    return (
        <div>
            <h2>Admin Sida</h2>
            {error && <div>{error}</div>}
            <div>
                <h3>Användare</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {editUser && editUser.id === user.id ? (
                                <form onSubmit={handleUpdate}>
                                    <input
                                        type="text"
                                        name="username"
                                        value={editUser.username}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={editUser.email}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={editUser.password}
                                        onChange={handleEditChange}
                                        required
                                    />
                                    <button type="submit">Spara</button>
                                    <button type="button" onClick={() => setEditUser(null)}>Avbryt</button>
                                </form>
                            ) : (
                                <>
                                    {user.username} ({user.email})
                                    <button onClick={() => handleEdit(user)}>Redigera</button>
                                    <button onClick={() => handleDelete(user.id)}>Radera</button>
                                </>

                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Skapa ny användare</h3>
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Användarnamn"
                        value={newUser.username}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Post"
                        value={newUser.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Lösenord"
                        value={newUser.password}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Skapa</button>
                </form>
            </div>
        </div>
    );

};

export default Admin;