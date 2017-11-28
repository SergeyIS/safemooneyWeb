using System;
using System.Configuration;

namespace SafeMooney.Web.Infrastructure
{
    public class RemoteConfig : ConfigurationSection
    {
        [ConfigurationProperty("remoteHost", IsRequired = true)]
        public String RemoteHost
        {
            get { return (String)base["remoteHost"]; }
            set { value = (String)base["remoteHost"]; }
        }
    }
}