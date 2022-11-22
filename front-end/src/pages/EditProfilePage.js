import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileNavbarComponent from "../components/ProfileNavbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
    const [data, setData] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    //Token
    const jwtToken = localStorage.getItem("token");

    //-------------------render profile data onto the page-------------------------
    const fetchProfileData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL}/profilePage`,
                {
                    headers: { Authorization: `JWT ${jwtToken}` },
                }
            );
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfileData();
    });
    //---------------Form validation--------------------------------

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        let newData = {
            displayName: displayName,
            firstName: firstName,
            lastName: lastName,
        };
        if (newData.firstName === "") newData.firstName = data.firstName;
        if (newData.lastName === "") newData.lastName = data.lastName;
        if (newData.displayName === "") newData.displayName = data.displayName;

        axios
            // post new message to server
            .post(`${process.env.REACT_APP_URL}/editInfo`, newData, {
                headers: { Authorization: `JWT ${jwtToken}` },
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        navigate("/profilePage");
    };

    //---------------------------returning------------------------------
    return (
        <div>
            <ProfileNavbarComponent />
            <div id="title">
                <br></br>
                <p>Edit Profile</p>
            </div>

            <div id="pfImg">
                <Image
                    src={data.image}
                    roundedCircle
                    height="140"
                    width="140"
                />
            </div>

            <div id="changeImageText">
                <Link to={"/addImage"}>Change Profile Image</Link>
            </div>

            {/*------------------------------Form section------------------------*/}
            <div id="infoEdit">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Display Name"
                            defaultValue={data.displayName}
                            required
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            defaultValue={data.firstName}
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            defaultValue={data.lastName}
                            required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder={data.email} disabled />
                    </Form.Group>
                    <br></br>
                    <Button type="submit" variant="primary">
                        Save
                    </Button>{" "}
                    <Button href={"/profilePage"} variant="secondary">
                        Done
                    </Button>{" "}
                </Form>
            </div>
            <Footer />
        </div>
    );
}

export default EditProfilePage;
