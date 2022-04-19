import React, { useState } from 'react';
import './memes.css';

export const getText = (slug, callBackFunction) => {
  fetch(`/api/comments?slug=${slug}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res && res.posts) callBackFunction(res.posts)
    })
    .catch((e) => {
      console.log(e)
    })
}

export const writeText = (name, slug, content, email, callBackFunction) => {
  fetch(`/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      slug,
      content,
      email,
    }),
  })
    .then(() => {
      callBackFunction()
    })
    .catch((e) => {
      console.log(e)
    })
}

export const LoadText = ({ comments }) => {
  return (
    comments &&
    comments
      .sort((a, b) => (new Number(a.time) > new Number(b.time) ? -1 : 1))
      .map((item, index) => (
        <div
          key={index}
          className="border dark:border-gray-100 rounded p-3 w-full mt-3 flex flex-col"
        >
          <span className="text-lg text-gray-100 dark:text-gray-100 font-medium">
            {item.name} &middot; {new Date(1000 * item.time).toLocaleDateString()}
          </span>
          <span className="mt-3 text-md text-gray-100 dark:text-gray-100">{item.content}</span>
        </div>
      ))
  )
}

const WriteText = ({ slug, setComments }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        writeText(name, slug, content, email, () => getText(slug, setComments))
        setName('')
        setEmail('')
        setContent('')
      }}
      className="mt- flex flex-col w-full"
    >
      <h1 className="font-semibold text-lg">Write a comment</h1>
      <div className="flex flex-col sm:flex-row sm:space-x- items-start">
        <input
          required
          value={name}
          placeholder="Name*"
          onChange={(e) => setName(e.target.value)}
          className="mt-5 w-full sm:w-1/2 appearance-none outline-none ring-0 px-10 py-2 border dark:hover:border-white hover:border-black rounded hover:shadow text-black dark:bg-black dark:text-gray-300 dark:border-gray-500"
        />
        <div className="mt-5 w-full sm:w-1/2 flex flex-col space-y-1">
          <input
            value={email}
            placeholder="Email (Optional)"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full appearance-none outline-none ring-0 px-5 py-2 border dark:hover:border-white hover:border-black rounded hover:shadow text-black dark:bg-black dark:text-gray-300 dark:border-gray-500"
          />
          <span className="text-sm text-gray-400">Email will remain confidential.</span>
        </div>
      </div>
      <textarea
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={'Comment*\nMaximum of 100 characters.'}
        className="mt-3 appearance-none outline-none ring-0 pt-3 px-3 pb-10 border dark:hover:border-white hover:border-black rounded hover:shadow text-black dark:bg-black dark:text-gray-300 dark:border-gray-500"
      />
      <button
        type="submit"
        className="w-[200px] appearance-none mt-3 py-3 px-3 text-center rounded border hover:bg-gray-100 dark:hover:bg-[#28282B] dark:border-gray-500"
      >
        Post a comment
      </button>
    </form>
  )
}

export default WriteText
