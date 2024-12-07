import { useState } from "react";

function LocalStorage () {
const storedInfo = JSON.parse(localStorage.getItem('info'));

const [userInfo, setUserInfo] = useState(storedInfo);
}

export default LocalStorage;