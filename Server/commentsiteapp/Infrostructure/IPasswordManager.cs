namespace commentsiteapp.Infrostructure
{
    public interface IPasswordManager
    {
        byte[] CreatePassword(string login, string password);
        bool PasswordsAreEqual(string login, string passwordForVerification, byte[] hashForVerification);
    }
}