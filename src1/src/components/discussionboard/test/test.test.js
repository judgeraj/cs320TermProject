import Enzyme from 'enzyme';
import React, { useState } from 'react';
import App from "../App";
import Topic from "../TopicAnimeSidebar/TopicSidebar"
import Anime from "../TopicAnimeSidebar/AnimeSidebar"
import Login from "../loginUser"
import { Provider } from 'react-redux'
import { store } from '../app/store';
import { render, screen, fireEvent } from '@testing-library/react'
import { create } from "react-test-renderer";

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const isTopicCreated = require('../TopicAnimeSidebar/TopicSidebar').isTopicCreated
const logUser = require('../App').UserLoggin

//#1
//White box testing/ function coverage 
{/* 
function App()
const userId = useSelector(selectUser);
// UserLoggin();
const [tab, setTab] = useState(true);
const togTab = (boolean) => {
  setTab(boolean);
}
return ( 
    <div className='appTab'>
        <button data-testid="buttonDis" className={tab === true ? "tab active-tab" : "tab"} onClick={() => togTab(true)}> 
        <h2>Discussion Board</h2></button>
        <button data-testid="buttonAn" className={tab === false ? "tab active-tab" : "tab"} onClick={() => togTab(false)}>
        <h2>Anime Review</h2></button>
    </div> 
    div className='insideTab'> 
        <div className={tab === true ? "thistab active" : "thistab"}>
        <Discussion /> </div>
        <div className={tab === false ? "thistab active" : "thistab"}>
        <AnimeSidebar /> </div>
    </div>
*/}
//this second one is from the second file ("AnimeSidebar") being called by the file above which the 
{/*form method="POST" action="addMessage">
        <input placeholder={'add message'}/>
        <button className='sendButton' 
        type="submit">Send</button>
        
 </form> */}
 {/* <Button onClick={() => authenticate.signOut()}>Log Out</Button> */}

test('Checking if html rendered four buttons', async() =>{
    render(<Provider store={store}><App /></Provider>);
    const items = await screen.findAllByRole('button')
    expect(items).toHaveLength(4)
})
//#2
//acceptance test
test('Snapshot success', ()=>{
    const snap = create(<Anime/>)
    expect(snap.toJSON()).toMatchSnapshot()
})
//#3
//acceptance test
test("Discussion tab button exists", () =>{
    const { getByTestId } = render(<Provider store={store}><App /></Provider>);
    const button = getByTestId("buttonDis")
    expect(button).toBeDefined()
})
//#4
//acceptance test
test("Anime tab button clicke test success", () =>{
    render(<Provider store={store}><App /></Provider>);
    const button =  screen.getByTestId("buttonAn")
    expect(fireEvent.click(button)).toBeTruthy();
})
//#5
//acceptance test
test('Discussion tab button clicked test success', () => {
    render(<Provider store={store}><App /></Provider>)
    const button = screen.getByTestId("topicId")
    expect(fireEvent.click(button)).toBeTruthy()
})
//#6
//acceptance test
test("Topic creation button clicked test succes", () => {
    render(<Provider store={store}><Topic /></Provider>);
    const button = screen.getByTestId("topicId")
    expect(fireEvent.click(button)).toBeTruthy();
})
//#7
//acceptance test
test("Avatar HTML rendering", () => {
    const { queryByTestId } = render(<Provider store={store}><Topic/></Provider>)
    const avPage = queryByTestId("avatar")
    expect(avPage).toBeDefined();
})
//#8
//intergration test//Bottom-up using mock function and the true function
test("Topic creation function returned without errors", () => {
    const topic = jest.fn(()=>{
        const topicName = "Enter new topic";
        isTopicCreated(topicName)
    })
    topic();
    expect(topic).toHaveReturned()
})
//#9
//acceptance test
test("Sumbitted user input (anime title) for fecthing from API", () =>{
    const onSubmit = jest.fn()
    const { getByTestId } = render(<Provider store={store}><Anime onSubmit={onSubmit}/></Provider>)
    fireEvent.submit(getByTestId("anSearch"))
    onSubmit()
    expect(onSubmit).toHaveBeenCalled()
})
//#10
//white box test/ bottom-up
//<App><AnimeSidebar> <--- different files calling other files
//          <AnimePost>
//              function AnimePost{
//              return(
//              ...
//              src='https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SQSBAJOSTJD4BKWKHQUC45VYT4.jpg'
//               ...)}
//           </AnimePost>
//      </AnimeSidebar></App>
test('Renders image from a site', async() =>{
    render(<Provider store={store}><App /></Provider>);
    const items = await screen.findAllByRole('img')
    expect(items).toHaveLength(1)
})
//#11
//acceptance test
test("Sign out the user", () => {
    render(<Provider store={store}><Topic /></Provider>);
    const button = screen.getByTestId("signOutId")
    expect(fireEvent.click(button)).toBe(true)
})
//#12
//acceptance test
test("Sign in the user", () => {
    render(<Provider store={store}><Login/></Provider>);
    const button = screen.getByTestId("loginId")
    expect(fireEvent.click(button)).toBeTruthy()
})
const { assert } = require('chai');
const logUser = require('./testFunctions').UserLoggin

describe('Login Usr', function(){
    it('If the User login ', function(){
        let login = logUser();
        assert.isTrue(login);
    }),
    it('If the User logou', function(){
        let logout = logUser();
        assert.isFalse(logout)
    })
});
//74 lines of test code

