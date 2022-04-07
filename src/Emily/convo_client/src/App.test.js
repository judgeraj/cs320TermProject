import { render, screen } from "@testing-library/react";
import Enzyme from "enzyme";
import {shallow} from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";
import Convo from "./Convo";
import {userValid} from "./App";
import {convoValid, addUser} from "./ConvoList";
import {formatTime} from "./Convo";

Enzyme.configure( {adapter: new EnzymeAdapter()} );

// #1
// White box test - function coverage
    // function App() {
    //  ...
    //   return (
    //     <div className="App"></div>
    //  ...
    //}
test("Login screen renders without error", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.length).toBe(1);
});

// #2
// White box test - function coverage
// function Convo({socket, username, convo}){
//    ...
//          <div className="convo-size">
//            <p data-test='usersNum'># of users: {users.length}</p>
//          </div>
//    ...   
// }
test("Intially renders '# of users' display with 1 user", () => {
  const wrapper = shallow(<Convo />);
  const users = wrapper.find("[data-test='usersNum']");
  expect(users.text()).toBe("# of users: 1");
});

// #3
// White box test - branch coverage along with the next test
    // export function userValid(username) {
    //   if ((username.length > 0) && (username.length < 16)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
test("Username with 1 to 15 characters is valid", () => {
  expect(userValid("Emily")).toBe(true);
});

// #4
// White box test - branch coverage along with the previous test
test("Empty username is invalid", () => {
  expect(userValid("")).toBe(false);
});

// #5
// Integration test - bottom-up approach
// convoValid(): returns convo name if it is valid, else returns empty string
// addUser(): stores convo name and username in an object to pass to server
test("Convo name entered is valid and stored in the user object", () => {
  let convoInput = convoValid("Convo1", []);
  let convoAdded = addUser(convoInput, "Emily").convo;
  expect(convoAdded).toBe("Convo1");
});

// #6
// White box test - function coverage
    // export function convoValid(convo, convoList) {
    //   if (convoList.includes(convo)){
    //       return "";
    //   }
    //   if ((convo.length > 0) && (convo.length < 16) && (convo !== " ")) {
    //     return convo;
    //   } else {
    //     return "";
    //   }
    // }
test("Convo name that already exists returns an empty string", () => {
  let convo = convoValid("Convo1", ["Convo1"]);
  expect(convo).toBe("");
});

// #7
// White box test - function coverage
    // function App() {
    //    ...
    //       return (
    //          <div className="App">
    //           {currentScreen === "login" ? (
    //             <div className="loginContainer"> 
    //               <h3>Login</h3>
    //               <p></p>
    //        ...
    // }
test("Renders login text when login page loads", () => {
  render(<App />);
  const loginText = screen.getByText(/Login/);
  expect(loginText).toBeInTheDocument();
});

// #8
// Acceptance test (along with tests #9, #10, and #11)
// minutes less than 10 and hours less than 12
test("1 hour and 5 mins is formatted to 1:05 AM", () => {
  let time = formatTime(5, 1);
  expect(time).toBe("1:05 AM")
});

// #9
// hours greater than 12
test("13 hours and 0 mins is formatted to 1:00 PM", () => {
  let time = formatTime(0, 13);
  expect(time).toBe("1:00 PM")
});

// #10
// hours equal to 0
test("0 hours and 0 mins is formatted to 12:00 AM", () => {
  let time = formatTime(0, 0);
  expect(time).toBe("12:00 AM")
});

// #11
// invalid input
test("Invalid time input returns an empty string", () => {
  let time = formatTime(300, 100);
  expect(time).toBe("")
});

// #12
// White box test - function coverage
    // function Convo({socket, username, convo}){
    //     ...
    //                           <button
    //                               onClick={() =>
    //                               setCurrentScreen("convoList")}
    //                               >&#8592;
    //                           </button>
    //     ...
    //                       <button className="button" onClick={() => setShowEmojis(!showEmojis)}
    //                           data-testid='emoji'>  
    //                            ...
    //                       </button>  
    //
    //                       <button onClick={sendMessage}>{"Send"}</button>
    //     ...
    // }
test("Exactly 3 buttons render on the convo screen", () => {
  const wrapper = shallow(<Convo />);
  expect(wrapper.find("button")).toHaveLength(3);
});
