import styled, { createGlobalStyle } from "styled-components";

export const GlobalAuth = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap');
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #040810;
  font-family: 'DM Mono', monospace;
`;

export const Card = styled.div`
  background: #080f1a;
  border: 1px solid #1e293b;
  border-radius: 20px;
  padding: 40px 36px;
  width: 100%;
  max-width: 400px;
`;

export const Brand = styled.h1`
  font-family: 'Syne', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.5px;
  margin: 0 0 4px;

  span { color: #6366f1; }
`;

export const Subtitle = styled.p`
  font-size: 11px;
  color: #475569;
  letter-spacing: 1px;
  margin: 0 0 32px;
`;

export const Label = styled.label`
  font-size: 11px;
  color: #64748b;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 10px 14px;
  color: #e2e8f0;
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  transition: border-color .15s;
  outline: none;

  &::placeholder { color: #334155; }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px #6366f122;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 0;
  border-radius: 8px;
  border: none;
  background: #6366f1;
  color: #fff;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .15s;

  &:hover:not(:disabled) { background: #4f46e5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const FooterText = styled.p`
  font-size: 11px;
  color: #475569;
  text-align: center;
  margin: 20px 0 0;

  a {
    color: #6366f1;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

export const ErrorAlert = styled.div`
  background: #1a0505;
  border: 1px solid #ef444433;
  border-radius: 8px;
  padding: 10px 14px;
  color: #ef4444;
  font-size: 11px;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
`;
