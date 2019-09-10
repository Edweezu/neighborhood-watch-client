import React from 'react'
import { NavLink } from 'react-router-dom'
import DashNav from '../../components/DashNav/DashNav'

class Crime extends React.Component {
    render () {
        return (
            <section>
                <DashNav />
                <div className='DashMainPosts'>
                        <div className='DashMainPosts__addPost'>
                            <div>
                               Post a new message
                            </div>
                            <div>
                                <label htmlFor='category'>Category</label>
                                <select id='category'>
                                    <option value='crime'>Crime and Safety </option>
                                    <option value='events'>Upcoming Events </option>
                                    <option value='lost'>Lost and Found</option>
                                </select> 
                            </div>
                            <div>
                                <label htmlFor='subject'>Subject</label>
                                <input type='text' id='subject' name='subject'></input>
                            </div>
                            
                                <label htmlFor='message'>Message</label>
                                <textarea id='message' name='message' rows='5' cols='30'>

                                </textarea>
                            
                        </div>
                        <p>This sidebar is of full height (100%) and always shown.</p>
  <p>Scroll down the page to see the result.</p>
  <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
  <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
  <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
  <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.</p>
                    </div>
            </section>
        )
    }
}

export default Crime