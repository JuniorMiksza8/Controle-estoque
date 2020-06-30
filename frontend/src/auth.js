module.exports = {
    isAuth(){
        const user = localStorage.getItem('userID');

        if(!user) return false;

        return true;
    }
}