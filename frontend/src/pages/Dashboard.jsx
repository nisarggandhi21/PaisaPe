import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export default function Dashboard() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState("");

    useEffect(() => {
        async function fetchBalance() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        }
        fetchBalance();
    }, []); 

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/user", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setUser(response.data.firstName);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        fetchUser();
    }, []); 

    const handleSignout = async () => {
        try {
            localStorage.removeItem("token");
            navigate("/signin");
        } catch (error) {
            console.error("Error during signout:", error);
        }
    };

    return (
        <div>
            <Appbar
                onClick={handleSignout}
                label={"Signout"}
                user={user}
            />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
}
