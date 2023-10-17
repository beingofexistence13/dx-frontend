/**
 * title: UmiJS - 插件化的企业级前端应用框架
 */
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Contributing } from '../components/Contributing';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { WhoIsUsing } from '../components/WhoIsUsing';

const GlobalStyle = createGlobalStyle`
  html[data-prefers-color='dark']{
    .bg {
      opacity: 0.1;
    }
    .bigLogo{
      opacity: 0.8;
    }
    .githubStar,.section-header-title {
      color: rgba(255, 255, 255, 0.7) !important;
    }
    .section-header-line{
      border-top-color: rgba(255, 255, 255, 0.7) !important;
    }
    .githubStar:before {
      filter: invert(80%);
    }
    .slogan, .contributing-text, .feature h3, .feature p {
      color: rgba(255, 255, 255, 0.8)!important;
    }
    .bow {
      opacity: 0.8;
    }
    .using-list li {
      background-color: rgba(255, 255, 255, 0.2);
      overflow: auto;
    }
    .foot-wrapper {
      .left .line h3,  .left .line div,  .left .line div a {
        color: rgba(255, 255, 255, 0.8)!important;
      }
    }
  }
`;

const Index = () => {
  return (
    <>
      <GlobalStyle />
      <Hero />
      <Features />
      <WhoIsUsing />
      <Contributing />
      <Footer />
    </>
  );
};

export default Index;
