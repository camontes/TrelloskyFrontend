function SideBar(){

    return(
    <header className="w-full h-20 bg-blue-300 text-white flex items-center px-6">
        {/* Título alineado a la izquierda */}
        <h1 className="text-xl font-bold cursor-pointer">Trellosky</h1>

        {/* (Opcional) Espacio para botones o enlaces a la derecha */}
        <nav className="ml-auto flex items-center gap-4">
            <a href="#" className="hover:underline">Perfil</a>
        </nav>
    </header>
    )
}

export default SideBar;