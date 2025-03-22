import React from 'react'
import Navabar from './Navabar'
type WrapperProps = {
	children : React.ReactNode
}

const Wrapper = ({children} : WrapperProps) => {
  return (
	<div>
		<Navabar />
		<div className='px-5 md:px-[10%] mt-10 mb-10'>
			{children}
		</div>
	</div>
  )
}

export default Wrapper