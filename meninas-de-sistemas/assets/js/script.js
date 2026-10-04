/* ===== RODAPÉ ===== */
.footer {
    background-color: #4c1d95;
    color: white;
    padding: 50px 40px 20px 40px; /* Aumentei o padding-bottom */
}

.footer-conteudo {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
    gap: 30px;
}

.footer-logo-secao .logo {
    max-height: 60px;
    width: auto;
}

.footer-links {
    display: flex;
    gap: 60px;
}

.footer-links h4 {
    color: white;
    margin-bottom: 15px;
    font-size: 16px;
}

.footer-links a {
    display: block;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin-bottom: 10px;
    transition: color 0.2s;
}

.footer-links a:hover {
    color: white;
}

/* NOVA SEÇÃO: COPYRIGHT */
.footer-bottom {
    text-align: center;
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

.footer-bottom p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
}

/* Responsividade do footer */
@media (max-width: 960px) {
    .footer-conteudo { 
        flex-direction: column; 
        align-items: center; 
        text-align: center; 
    }
    .footer-links { 
        gap: 30px; 
        flex-wrap: wrap;
        justify-content: center;
    }
}

@media (max-width: 640px) {
    .footer-links {
        flex-direction: column;
        gap: 30px;
        align-items: center;
    }
}