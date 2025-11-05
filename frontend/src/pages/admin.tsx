import { useEffect, useState } from "react"
import type { IUser } from "../interfaces/interfaces"
import { createUser, deleteUser, getAllUsers, updateUser } from "../services/adminService";
import FormField from "../components/formField";
import CInput from "../components/Input";
import CButton from "../components/Button";

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
        if (!editUser || !editUser._id) return;
        setError(null);
        try {
            await updateUser(editUser._id, editUser);
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
            <h2 className="main-h2">Admin Sida</h2>
            {error && <div className="text-red-600 font-medium text-center">{error}</div>}
            <div className="gFlexA flex-col py-5 gFlexRow">
                <div>
                    <h3 className="main-h3">Användare</h3>
                    <ul className="mt-4">
                        {users.map(user => (
                            <li key={user._id} className="gFlexS flex-col gap-1 py-4 px-2 rounded-md gFlexRow">
                                {editUser && editUser._id === user._id ? (
                                    <form onSubmit={handleUpdate} className="gFlexA flex-col gap-1 gFlexRow">
                                        <FormField id="user-username" label="Användarnamn:">
                                            <CInput
                                                type="text"
                                                id="user-username"
                                                name="username"
                                                value={editUser.username}
                                                onChange={handleEditChange}
                                            />
                                        </FormField>
                                        <FormField id="user-email" label="E-post:">
                                            <CInput
                                                type="email"
                                                id="user-email"
                                                name="email"
                                                value={editUser.email}
                                                onChange={handleEditChange}
                                            />
                                        </FormField>
                                        <FormField id="user-password" label="Lösenord:">
                                            <CInput
                                                type="password"
                                                id="user-password"
                                                name="password"
                                                value={editUser.password}
                                                onChange={handleEditChange}
                                            />
                                        </FormField>
                                        <CButton type="submit" className="mt-3 bg-green-500">Spara</CButton>
                                        <CButton type="button" onClick={() => setEditUser(null)} className="mt-3 bg-red-500">Avbryt</CButton>
                                    </form>
                                ) : (
                                    <>
                                        <span className="user-span">{user.username}</span><span className="user-span">({user.email})</span>
                                        <CButton onClick={() => handleEdit(user)} className="bg-yellow-600">Uppdatera</CButton>
                                        <CButton onClick={() => handleDelete(user._id)} className="bg-red-500">Radera</CButton>
                                    </>

                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="main-h3">Skapa ny användare</h3>
                    <form onSubmit={handleCreate}>
                        <FormField id="create-username" label="Användarnamn:">
                            <CInput
                                type="text"
                                id="create-username"
                                name="username"
                                placeholder="Ex Viktor"
                                value={newUser.username}
                                onChange={handleInputChange}
                            />
                        </FormField>
                        <FormField id="create-email" label="E-Post:">
                            <CInput
                                type="email"
                                id="create-email"
                                name="email"
                                placeholder="Ex mail@test.com"
                                value={newUser.email}
                                onChange={handleInputChange}
                            />
                        </FormField>
                        <FormField id="create-password" label="Lösenord:">
                            <CInput
                                type="password"
                                id="create-password"
                                name="password"
                                placeholder="Minst 8 tecken"
                                value={newUser.password}
                                onChange={handleInputChange}
                            />
                        </FormField>
                        <CButton type="submit" className="mt-3 bg-green-500">Skapa</CButton>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default Admin;