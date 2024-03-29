import { useState, useRef } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../../services/actions/user';
import profileStyle from './profile.module.css';
import ProfileNav from '../../components/profile-nav/profile-nav';


function ProfilePage() {
    const dispatch = useDispatch();

    const [isEditMode, setIsEditMode] = useState(false);
    const { user } = useSelector(state => state.user);

    let name = '';
    let email = '';
    if (user) {
        name = user.name;
        email = user.email;
    };

    const [nameState, setNameState] = useState(name);
    const inputRef = useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    };
 
    const [emailState, setEmailState] = useState(email);
    const emailOnChange = e => {
        setEmailState(e.target.value)
    };

    const submit = (e) => {
        e.preventDefault();

        if (e.nativeEvent.submitter.name === "save") {
            setIsEditMode(false);
            const toEdit = {};

            if (nameState !== name) {
                toEdit['name'] = nameState;
            }
            if (emailState !== email) {
                toEdit['name'] = emailState;
            }
            if (Object.keys(toEdit).length) {
                // console.log(toEdit);
                dispatch(updateUserAction(toEdit));
            }
        } else {
            setIsEditMode(false);
            setNameState(name);
            setEmailState(email);
        }
    }

    return (
    <>
        <div className={ profileStyle.profile }>
            <ProfileNav type={ "profile" } />
            <div className={ profileStyle.profile_input }>
                <div>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setNameState(e.target.value)}
                        value={nameState}
                        name={'nameState'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"
                        icon='EditIcon'
                        onClick={ () => setIsEditMode(true) }
                        />
                </div>
                <div className="mt-6">
                    <EmailInput
                        onChange={emailOnChange}
                        value={emailState}
                        name={'emailState'}
                        isIcon={false}
                        placeholder='Логин'
                        icon='EditIcon'
                        onClick={ () => setIsEditMode(true) }
                        />
                </div>
                <div className="mt-6">
                <PasswordInput
                    value={"*****"}
                    name={'password'}
                    extraClass="mb-2"
                    icon='EditIcon'
                    onClick={ () => setIsEditMode(false) }
                />
                </div>
                { isEditMode &&
                    <form action="" onSubmit={ submit }>
                        <div className={ profileStyle.profile_edit }>
                            <Button htmlType="submit" type="secondary" size="large" name="canel">
                                Отмена
                            </Button>
                            <Button htmlType="submit" type="primary" size="large" name="save">
                                Сохранить
                            </Button>
                        </div>
                    </form>
                }
            </div>
        </div>
    </>
    );
}

export default ProfilePage;
