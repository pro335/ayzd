import Styled from 'styled-components';

const ProfileAuthorBox = Styled.div`
    .author-info{
        text-align: center;
        border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
        .info{
            background-color: transparent;
        }
    }
    figure{
        position: relative;
        margin: 0;
        max-width: 120px;
        .ant-upload-select{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0;
            bottom: -2px;
            height: 40px;
            width: 40px;
            background: #fff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            span{
                display: inline-flex;
                height: 32px;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                width: 32px;
                background: ${({ theme }) => theme['primary-color']};
            } 
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
            }
        }
    }
    figcaption{
        .info{
            h1,
            h2,
            h3,
            h4,
            h5,
            h6{
                font-size: 18px;
                margin-bottom: 4px;
            }
            p{
                margin-bottom: 0;
                color: ${({ theme }) => theme['light-color']};
            }
        }
    }

    .settings-menmulist{
        padding: 20px 20px 0px 20px;
        li{
            a{
                display: flex;
                align-items: center;
                padding: 12px 20px;
                border-radius: 6px;
                color: ${({ theme }) => theme['light-color']};
                i,
                svg,
                img{
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 13px;
                }
                &.active{
                    font-weight: 500;
                    color: ${({ theme }) => theme['primary-color']};
                    background: ${({ theme }) => theme['primary-color']}05;
                }
            }
        }
    }
    .avatar-caption {
        margin-left: 20px;
        font-size: 15px;
    }
`;

const SocialProfileForm = Styled.div`
    .ant-form-item-control-input{
        min-height: 44px;
        .ant-form-item-control-input-content{
            input{
            padding: ${({ theme }) => (theme.rtl ? '12px 50px 12px 20px' : '12px 20px 12px 50px')} !important;
            }
            input::placeholder{
                font-size: 13px;
                color: ${({ theme }) => theme['light-color']};
            }
        }
    }
    .ant-form-item{
        button{
            padding: 0px 23px;
        }
        label{
            color: ${({ theme }) => theme['dark-color']};
        }
        .ant-input-affix-wrapper{
            position: relative;
            input{
                ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 50px;
            }
            span.fa,
            i{
                font-size: 18px;
                color: #fff;
            }
            &.facebook{
                .ant-input-prefix{
                    background: #3B5998;
                    border-radius: 4px;
                }
            }
            &.twitter{
                .ant-input-prefix{
                    background: #1DA1F2;
                    border-radius: 4px;
                }
            }
            &.dribbble{
                .ant-input-prefix{
                    background: #DD3E7C;
                    border-radius: 4px;
                }
            }
            &.linkedin{
                .ant-input-prefix{
                    background: #004182;
                    border-radius: 4px;
                }
            }
            &.instagram{
                .ant-input-prefix{
                    background: #FF0300;
                    border-radius: 4px;
                }
            }
            &.github{
                .ant-input-prefix{
                    background: #23282D;
                    border-radius: 4px;
                }
            }
            &.medium{
                .ant-input-prefix{
                    background: #292929;
                    border-radius: 4px;
                }
            }
            .ant-input-prefix{
                position: absolute;
                height: 100%;
                width: 44px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 0;
                top: 50%;
                transform: translateY(-50%);
                background: #ddd;
                z-index: 1;
                i,
                svg{
                    color: #fff;
                }
            }
        }
    }

    .social-form-actions{
        margin-top: 25px;
    }
`;

export {
  ProfileAuthorBox,
  SocialProfileForm,
};
