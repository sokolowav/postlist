import React, { useState, useEffect } from 'react'
import { usePosts } from '../hooks/usePosts'
import { useFetching } from '../hooks/useFetching'
import { getPagesCount } from '../utils/pages'
import { getPagesArray } from '../utils/pages'
import PostList from '../Components/PostList'
import MyForm from '../Components/UI/PostForm/PostForm'
import PostFilter from '../Components/UI/Filter/PostFilter'
import MyModal from '../Components/UI/Modal/MyModal'
import MyButton from '../Components/UI/Button/MyButton'
import PostService from '../API/PostService'
import Loader from '../Components/UI/Loader/Loader'
import Pagination from '../Components/UI/Pagination/Pagination'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const pagesArray = getPagesArray(totalPages)

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page)
      setPosts(response.data)
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPagesCount(totalCount, limit))
    }
  )

  useEffect(() => {
    fetchPosts(limit, page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => setPosts(posts.filter((p) => p.id !== post.id))

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className='App'>
      <MyModal visible={modal} setVisible={setModal}>
        <MyForm create={createPost} />
      </MyModal>

      <MyButton style={{ marginTop: 30 }} onPointerDown={() => setModal(true)}>
        Create post
      </MyButton>

      <div className='lineHorizontal' />

      <PostFilter filter={filter} setFilter={setFilter} />

      {postError && (
        <h1 style={{ textAlign: 'center', color: 'darkred' }}>
          Error {postError}
        </h1>
      )}

      {isPostsLoading ? (
        <Loader />
      ) : (
        <>
          <PostList
            remove={removePost}
            posts={sortedAndSearchedPosts}
            title="The Post's List"
          />
          <Pagination
            pagesArray={pagesArray}
            changePage={changePage}
            page={page}
          />
        </>
      )}
    </div>
  )
}
