import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=> {
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent(/contact form/i)
    expect(header).toBeTruthy()

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstName,"An");
    const errorMessage = await screen.queryAllByTestId("error")    
    expect(errorMessage).toHaveLength(1)


});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName,"")
    const lastName = screen.getByLabelText(/last name*/i)
    userEvent.type(lastName,"")
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email,"")

    const submit = screen.queryByRole("button")
    userEvent.click(submit)

    
    const errorMessage = await screen.queryAllByTestId("error")
    expect(errorMessage).toHaveLength(3)
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName,"Anthony")
    const lastName = screen.getByLabelText(/last name*/i)
    userEvent.type(lastName,"Leroi")
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email,"")
    const submit = screen.getByRole("button")
    userEvent.click(submit)

    const errorMessage = await screen.queryAllByTestId("error")
    expect(errorMessage).toHaveLength(1)

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email,"ehfuoh2*^&%@")
    const errorMessage = await screen.getByText(/email must be a valid email address/i)
    expect(errorMessage).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const lastName = screen.getByLabelText(/last name/i)
    userEvent.type(lastName,"")
    const submit = screen.getByRole("button")
    userEvent.click(submit)

    const errorMessage = await screen.getByText(/lastName is a required field/i)
    expect(errorMessage).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName,"Anthony")
    const lastName = screen.getByLabelText(/last name*/i)
    userEvent.type(lastName,"LeRoi")
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email,"anthony@gmail.com")
    const message = screen.getByLabelText(/message/i)
    userEvent.type(message,"")
    const submit = screen.queryByRole("button")
    userEvent.click(submit)

    await waitFor( () => {
        const showFirstName = screen.queryByText("Anthony")
        expect(showFirstName).toBeInTheDocument()
        const showLastName = screen.queryByText("LeRoi")
        expect(showLastName).toBeInTheDocument()
        const showEmail = screen.queryByText("anthony@gmail.com")
        expect(showEmail).toBeInTheDocument()
        const showMessage = screen.queryByText("ekhgkfdhkghdskgh")
        expect(showMessage).not.toBeInTheDocument()

    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName,"Anthony")
    const lastName = screen.getByLabelText(/last name*/i)
    userEvent.type(lastName,"LeRoi")
    const email = screen.getByLabelText(/email/i)
    userEvent.type(email,"anthony@gmail.com")
    const message = screen.getByLabelText(/message/i)
    userEvent.type(message,"ekhgkfdhkghdskgh")
    const submit = screen.queryByRole("button")
    userEvent.click(submit)

    await waitFor( () => {
        const showFirstName = screen.queryByText("Anthony")
        expect(showFirstName).toBeInTheDocument()
        const showLastName = screen.queryByText("LeRoi")
        expect(showLastName).toBeInTheDocument()
        const showEmail = screen.queryByText("anthony@gmail.com")
        expect(showEmail).toBeInTheDocument()
        const showMessage = screen.queryByText("ekhgkfdhkghdskgh")
        expect(showMessage).toBeInTheDocument()

    })
});