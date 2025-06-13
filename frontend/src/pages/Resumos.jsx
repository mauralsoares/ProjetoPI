import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/mapa.css";
import axios from "axios";
import ResumoCard from '../components/ResumoCard.jsx';

const Resumos = () => {
    const[ucs, setUcs] = useState([]);
    const[search, setSearch] = useState("");
    const[filtered, setFiltered] = useState([]);
    const[showDropdown, setShowDropdown] = useState(false);
    const [resumos, setResumos] = useState([]);
    const token = localStorage.getItem("token");
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        axios.get("/api/lists/ucs")
            .then(res => {
                setUcs(res.data);
                console.log("UCs recebidas:", res.data);
            })
            .catch(err => {
        console.error("Erro ao buscar UCs:", err);
      });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (search.trim() === "") {
            setFiltered([]);
            setShowDropdown(false);

            axios.get("/api/files", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setResumos(res.data.files);
                console.log("Resumos restaurados:", res.data.files);
            })
            .catch(err => {
                console.error("Erro ao restaurar resumos:", err);
            });

        } else {
            const results = ucs.filter((uc) =>
                String(uc).toLowerCase().includes(search.toLowerCase())
            );
            setFiltered(results);
            setShowDropdown(true);
        }
    }, [search, ucs]);

    const handleSelect = (uc) => {
        setSearch(uc);
        setFiltered([]);
        setShowDropdown(false);

        const token = localStorage.getItem("token");

        axios.get("/api/files", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const todosResumos = res.data.files;
            const filtrados = todosResumos.filter(file =>
                file.uc?.toLowerCase().includes(uc.toLowerCase())
            );

            setResumos(filtrados);
            console.log("Resumos filtrados localmente:", filtrados);
        })
        .catch(err => {
            console.error("Erro ao buscar resumos:", err);
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            console.warn("Token não encontrado. Utilizador pode não estar autenticado.");
            return;
        }

         axios.get("http://localhost:4000/api/files", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setResumos(res.data.files);
            console.log("Resumos carregados (sem filtro):", res.data.files);
        })
        .catch(err => {
            console.error("Erro ao carregar todos os resumos:", err);
        });
    }, []);

    useEffect(() => {
        function handleClickOutside(event){
            if(
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div className="resumos-container">
            <div className="upload-resumo-header">
          <h2>Fórum de Resumos</h2>
          <hr className="divider" />
        </div>
            <input
                ref={inputRef}
                type="text"
                placeholder="Pesquisa uma cadeira..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => search && setShowDropdown(true)}
                className="resumos-search"
            />
            {showDropdown && filtered.length > 0 &&(
                <div className="resumos-dropdown" ref={dropdownRef}>
                    {filtered.map((uc, index) => (
                        <div
                        key={index}
                        className="resumos-dropdown-items"
                        onClick={() => handleSelect(uc)}
                        >
                            {uc}
                        </div>
                    ))}
                </div>
            )}
            <div className="resumo-list">
                {resumos.map((resumo) => (
                    <ResumoCard key={resumo._id} resumo={resumo} />
                ))}
            </div>
        </div>
    );
};

export default Resumos;