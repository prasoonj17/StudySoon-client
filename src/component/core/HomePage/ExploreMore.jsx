import React from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import { useState } from 'react'
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'
// iske madat se data/homepage-explor.js se data aaiga
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
]
const ExploreMore = () => {
    // ye jo he ye bata raha he ki jb hm home page pr hoge to vaha initial state ky hoga
    // basicaly ye ek nav k lea jisme "Free" "New to coding", "Most popular" "Skill paths" "Career paths" cheze he 
    // inpr click krne pr inke card khulte he in card ka data HomePageExplore se aara h
    // yaha  in  card ki or nav ki initial state batai he

    // initial tag
    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag)
    // initaial course
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    // initial card
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    // ye login jb hm card change krege to sb me changes ho
    const setMyCourse = (value) => {
        setCurrentTab(value)
        const result = HomePageExplore.filter((courses) => courses.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }
    return (
        <div>
            {/* heading text */}
            <div className='text-4xl font-semibold text-center '>
                Unlock the
                <HighlightText text={"Power of Code"} />
            </div>
            {/* Sub-Heading text */}
            <p className='text-center text-gray-300  text-lg font-semibold mt-3 mb-3 lg:mb-0 '>
                Learn to build anything you can imagine
            </p>

            {/* Tabs div */}
            <div className=' hidden lg:flex mt-5 shadow-custom  flex-row rounded-full
       bg-black mb-5 border-white
      p-1'>
                {
                    // sare tabsName ko nav me dikhane k lea une map se nikal dea
                    tabsName.map((element, index) => {
                        return (
                            <div
                                // jispr hm ho use black krdo
                                className={`text-[16px] flex flex-row items-center gap-9 font-medium
                        ${currentTab === element}
                        ? " bg-[#272727] text-white font-medium"
                : " text-white" } rounded-full transition-all duration-200 cursor-pointer
                hover:bg-gray-900 hover:text-white px-8 py-2`}
                                key={index}
                                onClick={() => setMyCourse(element)}
                            >
                                {element}
                            </div>
                        )
                    })
                }
            </div>
            {/* Gap div */}
            <div className='hidden lg:block lg:h-[200px]'></div>

            {/* course card ka group */}
            <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between 
      flex-wrap w-full lg:left-1 lg:-translate-y-[50%] text-black 
      lg:mb-0  mb-9 lg:px-0 px-3'>
        {
            courses.map((element,index)=>{
                return(
                    <CourseCard 
                    key={index}
                    cardData = {element}
                    currentCard = {currentCard}
                    onClick = {()=>{setCurrentCard(element.heading)}}
                    />
                )
            })
        }
            </div>
        </div>
    )
}

export default ExploreMore
