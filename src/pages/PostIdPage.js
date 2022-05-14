import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import Loader from '../Components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'

export default function PostIdPage(props) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const params = useParams()
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })
  const [fetchCommentsByPostId, isCommentsLoading, commentsError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsByPostId(id)
      setComments(response.data)
    }
  )

  useEffect(() => {
    fetchPostById(params.id)
    fetchCommentsByPostId(params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h2 className='heading'>Post №{params.id}</h2>
      {isLoading || isCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          <h1 className='heading'>{post.title}</h1>
          <div>{post.body}</div>
          <div className='lineHorizontal' />
          <h3 className='heading'>Comments</h3>
          <div>
            {comments.map((comment) => (
              <>
                <h3>{comment.name}</h3>
                <p>{comment.body}</p>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
