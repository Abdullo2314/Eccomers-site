import React, { useState, useEffect } from "react";
import { User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RegistrationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setError("");
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (isLoginMode) {
            const user = users.find(
                (u) => u.email === email && u.password === password
            );
            if (!user) return setError("Неверный email или пароль");

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            setLoggedInUser(user);
            setIsOpen(false);
            navigate("/admin");
        } else {
            if (!name || !email || !password || !confirmPassword) {
                return setError("Все поля обязательны");
            }
            if (password !== confirmPassword) {
                return setError("Пароли не совпадают");
            }
            if (users.find((u) => u.email === email)) {
                return setError("Email уже используется");
            }

            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedInUser", JSON.stringify(newUser));
            setLoggedInUser(newUser);
            setIsOpen(false);
            navigate("/admin");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        navigate("/");
    };

    return (
        <div>
            {loggedInUser ? (
                <div>
                    <span>Привет, {loggedInUser.name}!</span>
                    <button
                        onClick={handleLogout}
                        className='registration_out'
                    >
                        Выйти
                    </button>
                </div>
            ) : (
                <button className='registration_modal' onClick={toggleModal}>
                    <User />
                </button>
            )}

            {isOpen && (
                <div>
                    <div>
                        <button onClick={toggleModal}>
                            <X/>
                        </button>

                        <h2>
                            {isLoginMode ? "Вход" : "Регистрация"}
                        </h2>

                        {error && <p>{error}</p>}

                        <form onSubmit={handleSubmit}>
                            {!isLoginMode && (
                                <div>
                                    <label>Имя</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            <div>
                                    <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Пароль</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {!isLoginMode && (
                                <div>
                                    <label>Подтверждение пароля</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                            >
                                {isLoginMode ? "Войти" : "Зарегистрироваться"}
                            </button>
                        </form>

                        <div>
                            {isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                            <button
                                onClick={() => {
                                    setIsLoginMode(!isLoginMode);
                                    setError("");
                                }}
                            >
                                {isLoginMode ? "Зарегистрироваться" : "Войти"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegistrationModal;