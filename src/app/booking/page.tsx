import BookingFormPage from '@/components/booking/BookingFormPage';
import HeaderOne from '@/layouts/headers/HeaderOne';
import Wrapper from '@/layouts/Wrapper';
import React from 'react'

const page = () => {
  return (<Wrapper
  > <HeaderOne />
    <BookingFormPage/></Wrapper>
  )
}

export default page;